interface GetTaskListStatusMessageParams {
  isFetchingNextPage: boolean;
  hasNextPage: boolean;
  itemCount: number;
}

export const getTaskListStatusMessage = ({
  isFetchingNextPage,
  hasNextPage,
  itemCount,
}: GetTaskListStatusMessageParams) => {
  if (isFetchingNextPage) {
    return '다음 할 일을 불러오는 중입니다.';
  }

  if (hasNextPage) {
    return '아래로 스크롤하면 다음 목록을 불러옵니다.';
  }

  return `모든 할 일을 불러왔습니다. (${itemCount}개)`;
};
