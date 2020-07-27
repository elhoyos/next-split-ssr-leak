import React from 'react';
import { SplitFactory } from '@splitsoftware/splitio-react';

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
              <WrappedComponent {...props} {...splitProps} />
            )
          }}
        </SplitFactory>
      )
    }
  }
}