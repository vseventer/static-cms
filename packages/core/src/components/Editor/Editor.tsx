import { createHashHistory } from 'history';
import debounce from 'lodash/debounce';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { translate } from 'react-polyglot';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { logoutUser } from '@staticcms/core/actions/auth';
import {
  createDraftDuplicateFromEntry,
  createEmptyDraft,
  deleteDraftLocalBackup,
  deleteEntry,
  deleteLocalBackup,
  loadEntry,
  loadLocalBackup,
  persistEntry,
  persistLocalBackup,
  retrieveLocalBackup,
} from '@staticcms/core/actions/entries';
import { loadScroll, toggleScroll } from '@staticcms/core/actions/scroll';
import { selectFields } from '@staticcms/core/lib/util/collection.util';
import { useWindowEvent } from '@staticcms/core/lib/util/window.util';
import { selectEntry } from '@staticcms/core/reducers/selectors/entries';
import { useAppDispatch } from '@staticcms/core/store/hooks';
import confirm from '../UI/Confirm';
import Loader from '../UI/Loader';
import EditorInterface from './EditorInterface';

import type {
  Collection,
  EditorPersistOptions,
  Entry,
  TranslatedProps,
} from '@staticcms/core/interface';
import type { RootState } from '@staticcms/core/store';
import type { Blocker } from 'history';
import type { ComponentType, FC } from 'react';
import type { ConnectedProps } from 'react-redux';

const Editor: FC<TranslatedProps<EditorProps>> = ({
  entry,
  entryDraft,
  fields,
  collection,
  user,
  hasChanged,
  displayUrl,
  isModification,
  draftKey,
  editorBackLink,
  scrollSyncEnabled,
  showDelete,
  slug,
  localBackup,
  t,
}) => {
  const [version, setVersion] = useState(0);

  const history = createHashHistory();
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const createBackup = useMemo(
    () =>
      debounce(function (entry: Entry, collection: Collection) {
        dispatch(persistLocalBackup(entry, collection));
      }, 2000),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const deleteBackup = useCallback(() => {
    createBackup.cancel();
    if (slug) {
      dispatch(deleteLocalBackup(collection, slug));
    }
    dispatch(deleteDraftLocalBackup());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collection, createBackup, slug]);

  const [submitted, setSubmitted] = useState(false);
  const handlePersistEntry = useCallback(
    (opts: EditorPersistOptions = {}) => {
      const { createNew = false, duplicate = false } = opts;

      if (!entryDraft.entry) {
        return;
      }

      setSubmitted(true);

      setTimeout(async () => {
        try {
          await dispatch(persistEntry(collection, navigate));
          setVersion(version + 1);

          deleteBackup();

          if (createNew) {
            if (duplicate && entryDraft.entry) {
              dispatch(createDraftDuplicateFromEntry(entryDraft.entry));
              navigate(`/collections/${collection.name}/new`, { replace: true });
            } else {
              setSubmitted(false);
              setTimeout(() => {
                dispatch(createEmptyDraft(collection, location.search));
                setVersion(version + 1);
                navigate(`/collections/${collection.name}/new`, { replace: true });
              }, 100);
            }
          }
          // eslint-disable-next-line no-empty
        } catch (e) {}
      }, 100);
    },
    [collection, deleteBackup, dispatch, entryDraft.entry, navigate, version],
  );

  const handleDuplicateEntry = useCallback(() => {
    if (!entryDraft.entry) {
      return;
    }

    dispatch(createDraftDuplicateFromEntry(entryDraft.entry));
    navigate(`/collections/${collection.name}/new?duplicate=true`, { replace: true });
  }, [collection.name, dispatch, entryDraft.entry, navigate]);

  const handleDeleteEntry = useCallback(async () => {
    if (entryDraft.hasChanged) {
      if (
        !(await confirm({
          title: 'editor.editor.onDeleteWithUnsavedChangesTitle',
          body: 'editor.editor.onDeleteWithUnsavedChangesBody',
          color: 'error',
        }))
      ) {
        return;
      }
    } else if (
      !(await confirm({
        title: 'editor.editor.onDeletePublishedEntryTitle',
        body: 'editor.editor.onDeletePublishedEntryBody',
        color: 'error',
      }))
    ) {
      return;
    }

    if (!slug) {
      return navigate(`/collections/${collection.name}`);
    }

    setTimeout(async () => {
      await dispatch(deleteEntry(collection, slug));
      deleteBackup();
      return navigate(`/collections/${collection.name}`);
    }, 0);
  }, [collection, deleteBackup, dispatch, entryDraft.hasChanged, navigate, slug]);

  const [prevLocalBackup, setPrevLocalBackup] = useState<
    | {
        entry: Entry;
      }
    | undefined
  >();

  useEffect(() => {
    if (!prevLocalBackup && localBackup) {
      const updateLocalBackup = async () => {
        const confirmLoadBackupBody = await confirm({
          title: 'editor.editor.confirmLoadBackupTitle',
          body: 'editor.editor.confirmLoadBackupBody',
        });

        if (confirmLoadBackupBody) {
          dispatch(loadLocalBackup());
          setVersion(version + 1);
        } else {
          deleteBackup();
        }
      };

      updateLocalBackup();
    }

    setPrevLocalBackup(localBackup);
  }, [deleteBackup, dispatch, localBackup, prevLocalBackup, version]);

  useEffect(() => {
    if (hasChanged && entryDraft.entry) {
      createBackup(entryDraft.entry, collection);
    }

    return () => {
      createBackup.flush();
    };
  }, [collection, createBackup, entryDraft.entry, hasChanged]);

  const [prevCollection, setPrevCollection] = useState<Collection | null>(null);
  const [prevSlug, setPrevSlug] = useState<string | undefined | null>(null);
  useEffect(() => {
    if (!slug && prevSlug !== slug) {
      setTimeout(() => {
        dispatch(createEmptyDraft(collection, location.search));
      });
    } else if (slug && (prevCollection !== collection || prevSlug !== slug)) {
      setTimeout(() => {
        dispatch(retrieveLocalBackup(collection, slug));
        dispatch(loadEntry(collection, slug));
      });
    }

    setPrevCollection(collection);
    setPrevSlug(slug);
  }, [collection, entryDraft.entry, prevSlug, prevCollection, slug, dispatch]);

  const leaveMessage = useMemo(() => t('editor.editor.onLeavePage'), [t]);

  const exitBlocker = useCallback(
    (event: BeforeUnloadEvent) => {
      if (entryDraft.hasChanged) {
        // This message is ignored in most browsers, but its presence triggers the confirmation dialog
        event.returnValue = leaveMessage;
        return leaveMessage;
      }
    },
    [entryDraft.hasChanged, leaveMessage],
  );

  useWindowEvent('beforeunload', exitBlocker);

  const navigationBlocker: Blocker = useCallback(
    ({ location, action }) => {
      /**
       * New entry being saved and redirected to it's new slug based url.
       */
      const isPersisting = entryDraft.entry?.isPersisting;
      const newRecord = entryDraft.entry?.newRecord;
      const newEntryPath = `/collections/${collection.name}/new`;
      if (isPersisting && newRecord && location.pathname === newEntryPath && action === 'PUSH') {
        return;
      }

      if (hasChanged) {
        return leaveMessage;
      }
    },
    [
      collection.name,
      entryDraft.entry?.isPersisting,
      entryDraft.entry?.newRecord,
      hasChanged,
      leaveMessage,
    ],
  );

  useEffect(() => {
    const unblock = history.block(navigationBlocker);

    return () => {
      unblock();
    };
  }, [collection.name, history, navigationBlocker]);

  const handleLogout = useCallback(() => {
    dispatch(logoutUser());
  }, [dispatch]);

  const handleToggleScroll = useCallback(async () => {
    await dispatch(toggleScroll());
  }, [dispatch]);

  const handleLoadScroll = useCallback(async () => {
    await dispatch(loadScroll());
  }, [dispatch]);

  if (entry && entry.error) {
    return (
      <div>
        <h3>{entry.error}</h3>
      </div>
    );
  } else if (entryDraft == null || entryDraft.entry === undefined || (entry && entry.isFetching)) {
    return <Loader>{t('editor.editor.loadingEntry')}</Loader>;
  }

  return (
    <EditorInterface
      key={`editor-${version}`}
      draftKey={draftKey}
      entry={entryDraft.entry}
      collection={collection}
      fields={fields}
      fieldsErrors={entryDraft.fieldsErrors}
      onPersist={handlePersistEntry}
      onDelete={handleDeleteEntry}
      onDuplicate={handleDuplicateEntry}
      showDelete={showDelete ?? true}
      user={user}
      hasChanged={hasChanged}
      displayUrl={displayUrl}
      isNewEntry={!slug}
      isModification={isModification}
      onLogoutClick={handleLogout}
      editorBackLink={editorBackLink}
      toggleScroll={handleToggleScroll}
      scrollSyncEnabled={scrollSyncEnabled}
      loadScroll={handleLoadScroll}
      submitted={submitted}
      t={t}
    />
  );
};

interface CollectionViewOwnProps {
  name: string;
  slug?: string;
  newRecord: boolean;
  showDelete?: boolean;
}

function mapStateToProps(state: RootState, ownProps: CollectionViewOwnProps) {
  const { collections, entryDraft, auth, config, entries, scroll } = state;
  const { name, slug } = ownProps;
  const collection = collections[name];
  const collectionName = collection.name;
  const fields = selectFields(collection, slug);
  const entry = !slug ? null : selectEntry(state, collectionName, slug);
  const user = auth.user;
  const hasChanged = entryDraft.hasChanged;
  const displayUrl = config.config?.display_url;
  const isModification = entryDraft.entry?.isModification ?? false;
  const collectionEntriesLoaded = Boolean(entries.pages[collectionName]);
  const localBackup = entryDraft.localBackup;
  const draftKey = entryDraft.key;
  let editorBackLink = `/collections/${collectionName}`;
  if ('files' in collection && collection.files?.length === 1) {
    editorBackLink = '/';
  }

  if ('nested' in collection && collection.nested && slug) {
    const pathParts = slug.split('/');
    if (pathParts.length > 2) {
      editorBackLink = `${editorBackLink}/filter/${pathParts.slice(0, -2).join('/')}`;
    }
  }

  const scrollSyncEnabled = scroll.isScrolling;

  return {
    ...ownProps,
    collection,
    collections,
    entryDraft,
    fields,
    entry,
    user,
    hasChanged,
    displayUrl,
    isModification,
    collectionEntriesLoaded,
    localBackup,
    draftKey,
    editorBackLink,
    scrollSyncEnabled,
  };
}

const connector = connect(mapStateToProps);
export type EditorProps = ConnectedProps<typeof connector>;

export default connector(translate()(Editor) as ComponentType<EditorProps>);
