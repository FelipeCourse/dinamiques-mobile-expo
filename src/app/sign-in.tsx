import { ScrollView, View } from 'react-native';

import {
  ContentBoxComponent,
  HeroComponent,
  SignInFormComponent,
  TitleComponent,
} from '@/components';

export default function SignInScreen(): JSX.Element {
  return (
    <View>
      <ScrollView>
        <HeroComponent>
          <HeroComponent.Header>
            <TitleComponent>Autenticação</TitleComponent>
          </HeroComponent.Header>
        </HeroComponent>
        <ContentBoxComponent>
          <SignInFormComponent />
        </ContentBoxComponent>
      </ScrollView>
    </View>
  );
}
