import { Image } from 'react-native';

export function LogoComponent(): JSX.Element {
  return <Image source={require('@/assets/images/logo.png')} />;
}
