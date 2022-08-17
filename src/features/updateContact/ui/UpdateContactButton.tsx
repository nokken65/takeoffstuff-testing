import { memo } from 'react';

import { Button } from '@/shared/ui';

type UpdateContactButton = { onShow: () => void };

const UpdateContactButtonView = ({ onShow }: UpdateContactButton) => {
  return (
    <Button className='h-full grow' onClick={onShow}>
      U
    </Button>
  );
};

export const UpdateContactButton = memo(UpdateContactButtonView);
