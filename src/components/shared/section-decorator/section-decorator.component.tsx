import { Path, Svg, SvgProps } from 'react-native-svg';

import { s } from './section-decorator.style';

type SectionDecoratorComponentProps = SvgProps;

export function SectionDecoratorComponent({
  style,
  fill,
}: SectionDecoratorComponentProps): JSX.Element {
  return (
    <Svg
      style={[s.sectionDecorator, style]}
      width={'100%'}
      height={148}
      fill={fill}
    >
      <Path d="M1600 148.002H0l1600-148v148z" />
    </Svg>
  );
}
