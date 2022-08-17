import { memo, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { useAppDispatch } from '@/app/store';
import { authModel } from '@/features/auth';
import { parseViewerIdFromJwt } from '@/shared/utils';

import { viewerApi } from '../api';
import { Viewer } from '../model/models';

type ViewerCompactProps = Viewer;

const ViewerCompactView = memo(({ email }: ViewerCompactProps) => {
  return (
    <div>
      <p>{email}</p>
    </div>
  );
});

const ViewerCompactContainer = () => {
  const token = useSelector(authModel.selectors.selectToken);
  const viewer = useSelector(authModel.selectors.selectViewer);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (token) {
      const id = parseViewerIdFromJwt(token);
      if (id) {
        dispatch(viewerApi.endpoints.getViewer.initiate({ id }));
      }
    }
  }, []);

  if (!viewer) {
    return <p>Loading...</p>;
  }

  return <ViewerCompactView {...viewer} />;
};

export const ViewerCompact = memo(ViewerCompactContainer);
