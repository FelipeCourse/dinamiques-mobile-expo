import { ScrollView, View } from 'react-native';

import {
  ContentBoxComponent,
  HeroComponent,
  SignUpFormComponent,
  TitleComponent,
} from '@/components';

export default function SignUpScreen(): JSX.Element {
  return (
    <View>
      <ScrollView>
        <HeroComponent>
          <HeroComponent.Header>
            <TitleComponent>Inscrição</TitleComponent>
          </HeroComponent.Header>
        </HeroComponent>
        <ContentBoxComponent>
          <SignUpFormComponent />
        </ContentBoxComponent>
      </ScrollView>
    </View>
  );
}
