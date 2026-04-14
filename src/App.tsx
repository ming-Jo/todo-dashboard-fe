function App() {
  return (
    <main className='mx-auto flex min-h-svh w-full max-w-4xl flex-col gap-6 px-6 py-10'>
      <section className='bg-layer rounded-xl border p-6'>
        <h1 className='text-content-primary text-2xl font-semibold'>디자인 토큰 기준 샘플</h1>
        <p className='text-content-secondary mt-2 text-sm'>Tailwind CSS 4 + token 구조 적용</p>
      </section>

      <section className='grid gap-4 md:grid-cols-2'>
        <div className='bg-layer rounded-xl border p-5'>
          <h2 className='text-content-primary text-base font-medium'>Primary 액션</h2>
          <div className='mt-3 flex flex-wrap gap-3'>
            <button
              type='button'
              className='bg-primary text-primary-foreground focus-visible:ring-focus-ring focus-visible:ring-offset-layer rounded-md px-4 py-2 text-sm font-medium ring-0 transition outline-none hover:opacity-95 focus-visible:ring-2 focus-visible:ring-offset-2'
            >
              활성 버튼
            </button>
            <button
              type='button'
              disabled
              className='bg-disabled text-disabled-foreground cursor-not-allowed rounded-md px-4 py-2 text-sm font-medium'
            >
              비활성 버튼
            </button>
          </div>
        </div>

        <div className='bg-layer-elevated rounded-xl border p-5'>
          <h2 className='text-content-primary text-base font-medium'>상태/피드백</h2>
          <div className='border-error/20 bg-error/10 text-error mt-3 rounded-md border px-3 py-2 text-sm'>
            에러 메시지 예시
          </div>
        </div>
      </section>

      <section className='bg-layer rounded-xl border p-5'>
        <h2 className='text-content-primary text-base font-medium'>레이어 기준</h2>
        <ul className='text-content-secondary mt-3 space-y-2 text-sm'>
          <li>
            <span className='text-content-primary font-medium'>background</span>: 앱 전체 바탕
          </li>
          <li>
            <span className='text-content-primary font-medium'>layer</span>: 카드/패널 기본 레이어
          </li>
          <li>
            <span className='text-content-primary font-medium'>layer-elevated</span>: 강조/호버
            레이어
          </li>
          <li>
            <span className='text-content-primary font-medium'>layer-overlay</span>: 모달 백드롭
            레이어
          </li>
        </ul>
      </section>
    </main>
  );
}

export default App;
