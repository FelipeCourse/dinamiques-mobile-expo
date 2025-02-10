import {
  ImageBackground,
  ImageBackgroundProps,
  View,
  ViewProps,
} from 'react-native';

import { colors } from '@/styles';

import { SectionDecoratorComponent } from '../section-decorator/section-decorator.component';
import { s } from './hero.style';

type HeroComponentProps = ViewProps & {
  backgroundImage?: ImageBackgroundProps;
};

function HeroComponent({
  backgroundImage,
  style,
  children,
}: HeroComponentProps): JSX.Element {
  return backgroundImage ? (
    <View style={[s.heroContainer, style]}>
      <ImageBackground
        style={s.heroBackgroundImage}
        source={backgroundImage.source}
        resizeMode="cover"
        blurRadius={2}
      >
        <View style={[s.heroContainerBackground, s.heroOverlay]}>
          {children}
        </View>
      </ImageBackground>
      <SectionDecoratorComponent fill={colors.base[16]()} />
    </View>
  ) : (
    <View style={[s.heroContainer, style]}>
      <View style={s.heroContainerBackground}>{children}</View>
      <SectionDecoratorComponent fill={colors.base[16]()} />
    </View>
  );
}

type HeroHeaderComponentProps = ViewProps;

function HeroHeaderComponent({
  style,
  children,
}: HeroHeaderComponentProps): JSX.Element {
  return <View style={style}>{children}</View>;
}

type HeroContentComponentProps = ViewProps;

function HeroContentComponent({
  style,
  children,
}: HeroContentComponentProps): JSX.Element {
  return <View style={[s.heroContent, style]}>{children}</View>;
}

type HeroFooterComponentProps = ViewProps;

function HeroFooterComponent({
  style,
  children,
}: HeroFooterComponentProps): JSX.Element {
  return <View style={style}>{children}</View>;
}

HeroComponent.Header = HeroHeaderComponent;
HeroComponent.Content = HeroContentComponent;
HeroComponent.Footer = HeroFooterComponent;

export { HeroComponent };
