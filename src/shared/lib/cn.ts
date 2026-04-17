// NOTE: Tailwind CSS 클래스를 병합하는 유틸리티 함수입니다.
export const cn = (...inputs: Array<string | false | undefined | null>): string =>
  inputs.filter(Boolean).join(' ');
