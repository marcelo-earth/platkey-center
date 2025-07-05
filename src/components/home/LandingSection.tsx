import React, { useEffect, useState, lazy, Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { useInView } from 'react-intersection-observer';
import classnames from 'classnames';

// Lazy load heavy components
const LazyAnimationPlayer = lazy(() => import('./LazyAnimationPlayer'));

// Images - keep these for immediate loading of visible content
import platkeyssh from '../../assets/ssh.webp';
import platkeysave from '../../assets/save.webp';
import platkeyinterface from '../../assets/interface.webp';

// TODO: Update this using the demo, maybe I don't need to declare a children prop
type KeyProps = {
  children: React.ReactNode;
};

const Key = ({ children }: KeyProps) => {
  return (
    <>
      &nbsp;
      <span className="inline bg-blue border border-b-2 border-black py-1 px-2 rounded-md font-mono cursor-pointer">
        {children}
      </span>
      &nbsp;
    </>
  );
};

type PlatKeyUIProps = {
  message: string;
};

const PlatKeyUI = (props: PlatKeyUIProps) => {
  return (
    <div className="flex justify-center items-center platkey-interface-container">
      <img
        src={platkeyinterface}
        alt="Interface of PlatKey"
        className="w-10/12 lg:w-[24rem] platkey-interface tracking-widest"
        loading="lazy"
      />
      <div className="absolute flex flex-col justify-center items-center">
        <h3 className="text-white font-bold	text-3xl md:text-[5rem] lg:text-[7rem] drop-shadow-xl">
          {props.message}
        </h3>
      </div>
    </div>
  );
};

type PlatKeyOptionProps = {
  letterKey: string;
  numberKey: string;
  keyPressed: string;
  optionText: string;
};

const PlatKeyOption = ({
  keyPressed,
  optionText,
  letterKey,
  numberKey,
}: PlatKeyOptionProps) => {
  const shouldBeSelected = keyPressed === letterKey || keyPressed === numberKey;
  return (
    <div
      className={classnames('rounded-lg flex text-white border', {
        'border-skyblue': shouldBeSelected,
        'border-[#637b9d]': !shouldBeSelected,
      })}
    >
      <div
        className={classnames('rounded-l-lg p-3', {
          'bg-skyblue text-[#24385b]': shouldBeSelected,
          'bg-[#24385b]': !shouldBeSelected,
        })}
      >
        <p>{letterKey}</p>
      </div>
      <div className="p-2 pl-6 flex items-center">
        <p>{optionText}</p>
      </div>
    </div>
  );
};

// Animation placeholder component
const AnimationPlaceholder = ({ height = "300px" }: { height?: string }) => (
  <div 
    className="flex items-center justify-center bg-gray-800 rounded-lg animate-pulse"
    style={{ height }}
  >
    <div className="text-white text-lg">Loading animation...</div>
  </div>
);

function LandingSection() {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      if (key.match(/^[a-e1-5]$/)) {
        setKeyPressed(key);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const featureClassNames =
    'flex flex-col justify-center items-center min-h-auto';
  const [keyPressed, setKeyPressed] = useState<string>('');

  // Intersection observer hooks for lazy loading
  const { ref: greenboardRef, inView: greenboardInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { ref: searchRef, inView: searchInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { ref: saveImageRef, inView: saveImageInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { ref: sshImageRef, inView: sshImageInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { t } = useTranslation('translation');
  
  return (
    <section className="min-h-screen bg-darkblue px-4 flex justify-center">
      <div className="flex flex-col gap-y-[16vh] py-[16vh] lg:pt-[2vh] lg:pb-[26vh]">
        <PlatKeyUI message={t('hero.message.big')} />
        <div className="flex flex-col gap-y-[6vh]">
          <h2
            className="text-white font-bold text-4xl lg:text-6xl text-center lg:pt-24"
            id="getting-started"
          >
            {t('hero.message.howitworks')}
          </h2>
        </div>
        <div className="flex flex-col gap-y-8">
          <p className="text-center text-3xl text-skyblue font-semibold">
            {t('hero.description.01')}
          </p>
          <p className="text-center text-3xl text-skyblue font-semibold">
            {t('hero.description.02')}
          </p>
        </div>
        <div className={featureClassNames}>
          <h3 className="text-green font-semibold text-3xl lg:text-4xl text-center">
            {t('feature.shortcuts.title')}
          </h3>
          <div className="flex flex-col gap-y-5 py-10 items-center">
            <p className="text-white inline text-2xl text-center">
              {t('feature.shortcuts.message')}
            </p>
            <p className="text-white inline text-2xl text-center">
              {t('feature.shortcuts.instruction.01')} <Key>1</Key>{' '}
              {t('feature.shortcuts.instruction.02')} <Key>2</Key>{' '}
              {t('feature.shortcuts.instruction.03')} <Key>3</Key>, <Key>4</Key>{' '}
              {t('feature.shortcuts.instruction.04')} <Key>5</Key>...
            </p>
            <p className="text-white inline text-2xl text-center">
              {t('feature.shortcuts.instruction.05')} <Key>a</Key>, <Key>b</Key>
              , <Key>c</Key>, <Key>d</Key>, <Key>e</Key>.
            </p>
          </div>
          <div className="flex flex-col gap-y-3 w-full text-xl">
            <PlatKeyOption
              keyPressed={keyPressed}
              optionText="Try press A, B, C right now!"
              letterKey="a"
              numberKey="1"
            />
            <PlatKeyOption
              keyPressed={keyPressed}
              optionText="Presiona A, B, o C ahora mismo"
              letterKey="b"
              numberKey="2"
            />
            <PlatKeyOption
              keyPressed={keyPressed}
              optionText="Así lucen las opciones en tu examen"
              letterKey="c"
              numberKey="3"
            />
            <PlatKeyOption
              keyPressed={keyPressed}
              optionText="This is how your options look like"
              letterKey="d"
              numberKey="4"
            />
            <PlatKeyOption
              keyPressed={keyPressed}
              optionText="Is it awesome?"
              letterKey="e"
              numberKey="5"
            />
          </div>
          <div className="flex flex-col gap-y-5 py-10 items-center">
            <p className="text-white inline text-2xl text-center">
              {t('feature.shortcuts.instruction.06.01')} <Key>0</Key> {t('or')}{' '}
              <Key>x</Key> {t('feature.shortcuts.instruction.06.02')}
            </p>
          </div>
        </div>
        <div className={featureClassNames} ref={greenboardRef}>
          <h3 className="text-green font-semibold text-3xl lg:text-4xl text-center">
            {t('feature.greenboard.title')}
          </h3>
          <div className="flex flex-col gap-y-5 py-10">
            <p className="text-white inline text-2xl text-center">
              {t('feature.greenboard.message')}{' '}
              <span className="underline decoration-green decoration-3 underline-offset-4">
                Greenboard
              </span>
              . {t('feature.greenboard.instruction.01')}
            </p>
            <Suspense fallback={<AnimationPlaceholder height="400px" />}>
              {greenboardInView && (
                <LazyAnimationPlayer 
                  animationType="greenboard"
                  width="100%"
                  height="400px"
                />
              )}
            </Suspense>
          </div>
        </div>
        <div className={featureClassNames} ref={saveImageRef}>
          <h3 className="text-green font-semibold text-3xl lg:text-4xl text-center">
            {t('feature.save.title')}
          </h3>
          <div className="flex flex-col gap-y-5 py-10">
            <p className="text-white inline text-2xl text-center">
              {t('feature.save.message')}
            </p>
          </div>
          {saveImageInView && (
            <img
              src={platkeysave}
              alt={t('feature.save.title') + ''}
              className="rounded-lg lg:w-[60rem] hover:scale-105 transition duration-300"
              loading="lazy"
            />
          )}
        </div>
        <div className={featureClassNames} ref={searchRef}>
          <h3 className="text-green font-semibold text-3xl lg:text-4xl text-center">
            {t('feature.spotlight.title')}
          </h3>
          <div className="flex flex-col gap-y-5 py-10">
            <p className="text-white inline text-2xl text-center">
              {t('feature.spotlight.message')}
            </p>
            <Suspense fallback={<AnimationPlaceholder height="300px" />}>
              {searchInView && (
                <LazyAnimationPlayer 
                  animationType="search"
                  width="100%"
                  height="300px"
                />
              )}
            </Suspense>
            <p className="text-white inline text-2xl text-center">
              {t('feature.spotlight.instruction.01')} <Key>Ctrl</Key>+
              <Key>K</Key> {t('feature.spotlight.instruction.02')}{' '}
              <Key>Cmd</Key>+<Key>K</Key>{' '}
              {t('feature.spotlight.instruction.03')}
            </p>
          </div>
        </div>
        <div className={featureClassNames}>
          <h3 className="text-green font-semibold text-3xl lg:text-4xl text-center">
            {t('feature.classes.title')}
          </h3>
          <div className="flex flex-col gap-y-5 py-10">
            <p className="text-white inline text-2xl text-center">
              {t('feature.classes.instruction.01')} <Key>Ctrl</Key>+<Key>B</Key>{' '}
              {t('feature.spotlight.instruction.02')} <Key>Cmd</Key>+
              <Key>B</Key> {t('feature.classes.instruction.03')}
            </p>
            <p className="text-white inline text-2xl text-center">
              {t('feature.classes.instruction.01')} <Key>Shift</Key>
              <Key>P</Key> {t('feature.classes.instruction.04')}
            </p>
            <p className="text-white inline text-2xl text-center">
              {t('feature.classes.instruction.01')} <Key>Shift</Key>
              <Key>N</Key> {t('feature.classes.instruction.05')}
            </p>
            <p className="text-white inline text-2xl text-center">
              {t('feature.classes.instruction.01')} <Key>Shift</Key>
              <Key>M</Key> {t('feature.classes.instruction.06')}
            </p>
            <p className="text-white inline text-2xl text-center">
              {t('feature.classes.instruction.01')} <Key>Shift</Key>
              <Key>A</Key> {t('feature.classes.instruction.07')}
            </p>
            <p className="text-white inline text-2xl text-center">
              {t('feature.classes.instruction.01')} <Key>Ctrl</Key>+
              <Key>Enter</Key> {t('feature.spotlight.instruction.02')}{' '}
              <Key>Cmd</Key>+<Key>Enter</Key>{' '}
              {t('feature.classes.instruction.08')}
            </p>
          </div>
        </div>
        <div className={featureClassNames} ref={sshImageRef}>
          <h3 className="text-green font-semibold text-3xl lg:text-4xl text-center">
            {t('feature.mode.title')}
          </h3>
          <div className="flex flex-col gap-y-5 py-10">
            <p className="text-white inline text-2xl text-center">
              {t('feature.mode.message')}
            </p>
          </div>
          {sshImageInView && (
            <img
              src={platkeyssh}
              alt={t('feature.mode.title') + ''}
              className="rounded-lg lg:w-[60rem] shadow-2xl shadow-black"
              loading="lazy"
            />
          )}
        </div>
      </div>
    </section>
  );
}

export default LandingSection;
