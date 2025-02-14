import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import React, { useMemo } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { getAsset as getAssetAction } from '@staticcms/core/actions/media';
import { VIEW_STYLE_GRID, VIEW_STYLE_LIST } from '@staticcms/core/constants/collectionViews';
import useMediaAsset from '@staticcms/core/lib/hooks/useMediaAsset';
import { getPreviewCard } from '@staticcms/core/lib/registry';
import {
  selectEntryCollectionTitle,
  selectFields,
  selectTemplateName,
} from '@staticcms/core/lib/util/collection.util';
import { selectConfig } from '@staticcms/core/reducers/selectors/config';
import { selectIsLoadingAsset } from '@staticcms/core/reducers/selectors/medias';
import { useAppSelector } from '@staticcms/core/store/hooks';
import useWidgetsFor from '../../common/widget/useWidgetsFor';

import type { CollectionViewStyle } from '@staticcms/core/constants/collectionViews';
import type { Collection, Entry, Field } from '@staticcms/core/interface';
import type { RootState } from '@staticcms/core/store';
import type { ConnectedProps } from 'react-redux';

const EntryCard = ({
  collection,
  entry,
  path,
  image,
  imageField,
  collectionLabel,
  viewStyle = VIEW_STYLE_LIST,
}: NestedCollectionProps) => {
  const summary = useMemo(() => selectEntryCollectionTitle(collection, entry), [collection, entry]);

  const fields = selectFields(collection, entry.slug);
  const imageUrl = useMediaAsset(image, collection, imageField, entry);

  const config = useAppSelector(selectConfig);

  const { widgetFor, widgetsFor } = useWidgetsFor(config, collection, fields, entry);

  const PreviewCardComponent = useMemo(
    () => getPreviewCard(selectTemplateName(collection, entry.slug)) ?? null,
    [collection, entry.slug],
  );

  if (PreviewCardComponent) {
    return (
      <Card>
        <CardActionArea
          component={Link}
          to={path}
          sx={{
            height: '100%',
            position: 'relative',
            display: 'flex',
            width: '100%',
            justifyContent: 'start',
          }}
        >
          <PreviewCardComponent
            collection={collection}
            fields={fields}
            entry={entry}
            viewStyle={viewStyle === VIEW_STYLE_LIST ? 'list' : 'grid'}
            widgetFor={widgetFor}
            widgetsFor={widgetsFor}
          />
        </CardActionArea>
      </Card>
    );
  }

  return (
    <Card>
      <CardActionArea component={Link} to={path}>
        {viewStyle === VIEW_STYLE_GRID && image && imageField ? (
          <CardMedia component="img" height="140" image={imageUrl} />
        ) : null}
        <CardContent>
          {collectionLabel ? (
            <Typography gutterBottom variant="h5" component="div">
              {collectionLabel}
            </Typography>
          ) : null}
          <Typography gutterBottom variant="h6" component="div" sx={{ margin: 0 }}>
            {summary}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

interface EntryCardOwnProps {
  entry: Entry;
  inferredFields: {
    titleField?: string | null | undefined;
    descriptionField?: string | null | undefined;
    imageField?: string | null | undefined;
    remainingFields?: Field[] | undefined;
  };
  collection: Collection;
  imageField?: Field;
  collectionLabel?: string;
  viewStyle?: CollectionViewStyle;
}

function mapStateToProps(state: RootState, ownProps: EntryCardOwnProps) {
  const { entry, inferredFields, collection } = ownProps;
  const entryData = entry.data;

  let image = inferredFields.imageField
    ? (entryData?.[inferredFields.imageField] as string | undefined)
    : undefined;

  if (image) {
    image = encodeURI(image.trim());
  }

  const isLoadingAsset = selectIsLoadingAsset(state);

  return {
    ...ownProps,
    path: `/collections/${collection.name}/entries/${entry.slug}`,
    image,
    imageField:
      'fields' in collection
        ? collection.fields?.find(f => f.name === inferredFields.imageField && f.widget === 'image')
        : undefined,
    isLoadingAsset,
  };
}

const mapDispatchToProps = {
  getAsset: getAssetAction,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
export type NestedCollectionProps = ConnectedProps<typeof connector>;

export default connector(EntryCard);
