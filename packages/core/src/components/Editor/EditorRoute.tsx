import React, { useMemo } from 'react';
import { Navigate, useParams } from 'react-router-dom';

import Editor from './Editor';
import { getDefaultPath } from '../../lib/util/collection.util';

import type { Collections } from '@staticcms/core/interface';

interface EditorRouteProps {
  newRecord?: boolean;
  collections: Collections;
}

const EditorRoute = ({ newRecord = false, collections }: EditorRouteProps) => {
  const { name, slug } = useParams();
  const shouldRedirect = useMemo(() => {
    if (!name) {
      return false;
    }
    return !collections[name];
  }, [collections, name]);

  const defaultPath = useMemo(() => getDefaultPath(collections), [collections]);

  if (shouldRedirect || !name || (!newRecord && !slug)) {
    return <Navigate to={defaultPath} />;
  }

  return <Editor name={name} slug={slug} newRecord={newRecord} />;
};

export default EditorRoute;
