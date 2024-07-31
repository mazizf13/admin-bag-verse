'use client';

import { useOrigin } from '@/hooks/use-origin';
import { useParams } from 'next/navigation';
import { ApiAlert } from './api-alert';

interface ApiListProps {
  indicatorName: string;
  indikatorId: string;
}

export const ApiList: React.FC<ApiListProps> = ({
  indicatorName,
  indikatorId,
}) => {
  const params = useParams();
  const origin = useOrigin();

  const baseUrl = `${origin}/api/${params.storeId}`;

  return (
    <>
      <ApiAlert
        title="GET"
        description={`${baseUrl}/${indicatorName}`}
        variant="public"
      />
      <ApiAlert
        title="GET"
        description={`${baseUrl}/${indicatorName}/{${indikatorId}}`}
        variant="public"
      />
      <ApiAlert
        title="POST"
        description={`${baseUrl}/${indicatorName}`}
        variant="admin"
      />
      <ApiAlert
        title="PATCH"
        description={`${baseUrl}/${indicatorName}/{${indikatorId}}`}
        variant="admin"
      />
      <ApiAlert
        title="DELETE"
        description={`${baseUrl}/${indicatorName}/{${indikatorId}}`}
        variant="admin"
      />
    </>
  );
};
