import React, { useEffect } from 'react';
import { SplitFactory, useClient } from '@splitsoftware/splitio-react';
import { NextPage } from 'next';

const unmountSplitClient = (client: SplitIO.IClient | null) => {
  if (client) {
    client.destroy();
  }
}

type Props = {
  splitioKey: string;
};

const ClientDestroyer: NextPage<Props> = ({ splitioKey, children }) => {
  const client = useClient(splitioKey);

  // client-side unmount
  useEffect(() => {
    return function _unmountSplitClient() {
      unmountSplitClient(client);
    }
  }, [client]);

  return (
    <>
    {children}
    </>
  );
}

export function withSplit() {
  const key = 'foo';
  const config: SplitIO.IBrowserSettings = {
    core: {
      authorizationKey: 'bar',
      key,
    }
  };

  return function withSplitFactoryHOC<OuterProps>(WrappedComponent: React.ComponentType<OuterProps>) {
    return (props: OuterProps) => {
      return (
        <SplitFactory config={config} >
          {(splitProps) => {
            return (
              <ClientDestroyer splitioKey={key}>
                <WrappedComponent {...props} {...splitProps} />
              </ClientDestroyer>
            )
          }}
        </SplitFactory>
      )
    }
  }
}