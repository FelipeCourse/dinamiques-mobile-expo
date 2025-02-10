import { router } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { colors, fontFamily, fontSize } from '@/styles';

import {
  ButtonComponent,
  ContentBoxComponent,
  HeroComponent,
  LogoComponent,
} from '@/components';

export const s = StyleSheet.create({
  wellcomeScreenTitle: {
    fontFamily: fontFamily.semiBold,
    fontSize: fontSize['h3-md'],
    lineHeight: fontSize['h3-md-lh'],
    color: colors.base.white(),
  },
  wellcomeScreenSubTitle: {
    marginTop: 16,
    fontFamily: fontFamily.regular,
    fontSize: fontSize.sm,
    lineHeight: fontSize['sm-lh'],
    color: colors.base['6'](),
  },
  wellcomeScreenActionsContainer: {
    marginTop: 24,
    gap: 16,
  },
  wellcomeScreenAuthButton: {
    backgroundColor: colors.base[11](),
  },
  wellcomeScreenAuthButtonText: {
    color: colors.base.white(),
  },
});

export default function WelcomeScreen() {
  return (
    <View>
      <HeroComponent>
        <LogoComponent />
      </HeroComponent>
      <ContentBoxComponent>
        <Text style={s.wellcomeScreenTitle}>Olá, Seja bem vindo!</Text>
        <Text style={s.wellcomeScreenSubTitle}>
          Se autentique ou crie uma conta para poder acessar o conteúdo
          disponível.
        </Text>
        <View style={s.wellcomeScreenActionsContainer}>
          <ButtonComponent
            style={s.wellcomeScreenAuthButton}
            onPress={() => router.push('/sign-in')}
          >
            <ButtonComponent.Text style={s.wellcomeScreenAuthButtonText}>
              Autenticação
            </ButtonComponent.Text>
          </ButtonComponent>
          <ButtonComponent onPress={() => router.push('/sign-up')}>
            <ButtonComponent.Text>Inscrição</ButtonComponent.Text>
          </ButtonComponent>
        </View>
      </ContentBoxComponent>
    </View>
  );
}
