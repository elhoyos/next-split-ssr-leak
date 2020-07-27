import React from 'react';
import { SplitFactory, useClient } from '@splitsoftware/splitio-react';
import { NextPage } from 'next';

const unmountSplitClient = (client: SplitIO.IClient | null) => {
  if (client) {
    client.destroy();
  }
}

// Need a class to implement componentWillUnmount
class ServerSplitDestroyer extends React.Component {
  private client: SplitIO.IClient;

  constructor(props: { client: SplitIO.IClient }) {
    super(props);
    this.client = props.client;
  }

  // server-side unmount
  componentWillUnmount() {
    unmountSplitClient(this.client);
  }

  render() {
    return (<></>)
  }
}

type Props = {
  splitioKey: string;
};

const ClientDestroyer: NextPage<Props> = ({ splitioKey, children }) => {
  const client = useClient(splitioKey);

  // client-side unmount
  React.useEffect(() => {
    return function _unmountSplitClient() {
      unmountSplitClient(client);
    }
  }, [client]);

  return (
    <>
    <ServerSplitDestroyer />
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