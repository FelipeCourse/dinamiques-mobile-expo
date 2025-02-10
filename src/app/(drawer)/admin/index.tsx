import { router } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { colors, fontFamily, fontSize } from '@/styles';

import { useAuthContext } from '@/contexts';

import {
  ButtonComponent,
  ContentBoxComponent,
  HeroComponent,
  TitleComponent,
} from '@/components';

export const s = StyleSheet.create({
  adminHomeScreenTitle: {
    fontFamily: fontFamily.semiBold,
    fontSize: fontSize['h3-md'],
    lineHeight: fontSize['h3-md-lh'],
    color: colors.base.white(),
  },
  adminHomeScreenSubTitle: {
    marginTop: 16,
    fontFamily: fontFamily.regular,
    fontSize: fontSize.sm,
    lineHeight: fontSize['sm-lh'],
    color: colors.base['6'](),
  },
  adminHomeScreenActionsContainer: {
    marginTop: 24,
    gap: 16,
  },
});

export default function AdminHomeScreen(): JSX.Element {
  const { userData } = useAuthContext();

  return (
    <View>
      <HeroComponent>
        <HeroComponent.Header>
          <TitleComponent>Administração</TitleComponent>
        </HeroComponent.Header>
      </HeroComponent>
      <ContentBoxComponent>
        <Text style={s.adminHomeScreenTitle}>Olá, {userData?.username}</Text>
        <Text style={s.adminHomeScreenSubTitle}>
          Acesse o menu ou escolha uma das opções abaixo.
        </Text>
        <View style={s.adminHomeScreenActionsContainer}>
          <ButtonComponent onPress={() => router.push('/admin/teachers')}>
            <ButtonComponent.Text>Docentes</ButtonComponent.Text>
          </ButtonComponent>
          <ButtonComponent onPress={() => router.push('/admin/students')}>
            <ButtonComponent.Text>Alunos</ButtonComponent.Text>
          </ButtonComponent>
          <ButtonComponent onPress={() => router.push('/admin/categories')}>
            <ButtonComponent.Text>Categorias</ButtonComponent.Text>
          </ButtonComponent>
          <ButtonComponent onPress={() => router.push('/admin/articles')}>
            <ButtonComponent.Text>Artigos</ButtonComponent.Text>
          </ButtonComponent>
        </View>
      </ContentBoxComponent>
    </View>
  );
}
