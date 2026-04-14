function App() {
  return (
    <main className='mx-auto flex min-h-svh w-full max-w-4xl flex-col gap-6 px-6 py-10'>
      <section className='rounded-xl border bg-layer p-6'>
        <h1 className='text-2xl font-semibold text-content-primary'>디자인 토큰 기준 샘플</h1>
        <p className='mt-2 text-sm text-content-secondary'>
          Tailwind CSS 4 + token 구조 적용
        </p>
      </section>

      <section className='grid gap-4 md:grid-cols-2'>
        <div className='rounded-xl border bg-layer p-5'>
          <h2 className='text-base font-medium text-content-primary'>Primary 액션</h2>
          <div className='mt-3 flex flex-wrap gap-3'>
            <button
              type='button'
              className='rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground outline-none ring-0 transition hover:opacity-95 focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-layer'
            >
              활성 버튼
            </button>
            <button
              type='button'
              disabled
              className='cursor-not-allowed rounded-md bg-disabled px-4 py-2 text-sm font-medium text-disabled-foreground'
            >
              비활성 버튼
            </button>
          </div>
        </div>

        <div className='rounded-xl border bg-layer-elevated p-5'>
          <h2 className='text-base font-medium text-content-primary'>상태/피드백</h2>
          <div className='mt-3 rounded-md border border-error/20 bg-error/10 px-3 py-2 text-sm text-error'>
            에러 메시지 예시
          </div>
        </div>
      </section>

      <section className='rounded-xl border bg-layer p-5'>
        <h2 className='text-base font-medium text-content-primary'>레이어 기준</h2>
        <ul className='mt-3 space-y-2 text-sm text-content-secondary'>
          <li>
            <span className='font-medium text-content-primary'>background</span>: 앱 전체 바탕
          </li>
          <li>
            <span className='font-medium text-content-primary'>layer</span>: 카드/패널 기본 레이어
          </li>
          <li>
            <span className='font-medium text-content-primary'>layer-elevated</span>: 강조/호버
            레이어
          </li>
          <li>
            <span className='font-medium text-content-primary'>layer-overlay</span>: 모달 백드롭
            레이어
          </li>
        </ul>
      </section>
    </main>
  );
}

export default App;
