import { Text, View } from 'react-native';
import { ArrowLeftEndOnRectangleIcon } from 'react-native-heroicons/outline';

import { colors } from '@/styles';

import { useAuthContext } from '@/contexts';

import { ButtonComponent } from '../button/button.component';
import { s } from './user.style';

export function UserComponent(): JSX.Element {
  const { userData, handleAuthenticate } = useAuthContext();

  return (
    <View style={s.userContainer}>
      <Text style={s.userName}>{userData?.username}</Text>
      <ButtonComponent
        style={s.userButton}
        onPress={() => handleAuthenticate(false)}
      >
        <ArrowLeftEndOnRectangleIcon size={20} color={colors.base.white()} />
      </ButtonComponent>
    </View>
  );
}
