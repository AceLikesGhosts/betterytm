// same as `new function(){}();`
// volume.ts adds 
// -> Better volume control
// -> An input where you can set the volume
(function () {

    console.log(
        '%c[BetterYTM] %cInjecting BetterVolume',
        'color:purple',
        'color:white'
    );

    // #region youtube's html player as an interface
    interface IHTMLPlayer {
        getVolume: () => number;
        setVolume: (volume: number) => void;
    }
    // #endregion 

    // #region Better volume control
    // from: https://greasyfork.org/en/scripts/397686-youtube-music-fix-volume-ratio/code
    // thank you Marco Pfeiffer <git@marco.zone> i love you
    const EXPONENT = 3 as const;
    const storedOriginalVolumes = new WeakMap();

    const { get, set } = Object.getOwnPropertyDescriptor(HTMLMediaElement.prototype, 'volume')!;
    Object.defineProperty(HTMLMediaElement.prototype, 'volume', {
        get: function () {
            // @ts-expect-error This is valid.
            const lowVolume = get.call(this);
            const calculatedOriginalVolume = lowVolume ** (1 / EXPONENT);

            // The calculated value has some accuracy issues which can lead to problems for implementations that expect exact values.
            // To avoid this, I'll store the unmodified volume to return it when read here.
            // This mostly solves the issue, but the initial read has no stored value and the volume can also change though external influences.
            // To avoid ill effects, I check if the stored volume is somewhere in the same range as the calculated volume.
            const storedOriginalVolume = storedOriginalVolumes.get((this as object));
            const storedDeviation = Math.abs(storedOriginalVolume - calculatedOriginalVolume);

            const originalVolume = storedDeviation < 0.01 ? storedOriginalVolume : calculatedOriginalVolume;
            return originalVolume;
        },
        /**
         * @param {number} originalVolume - The original volume that was set, before modification.
         */
        set: function (originalVolume: number) {
            const lowVolume = originalVolume ** EXPONENT;
            storedOriginalVolumes.set((this as object), originalVolume);
            // Inserted by BetterYTM - Not a part of Marco's source.
            console.log('%c[BetterYTM] %cSet volume to `' + lowVolume + '`', 'color:purple', 'color:white');
            // @ts-expect-error This is valid.
            set.call(this, lowVolume);
        }
    });
    // end of "borrowed" code
    // #endregion

    // MoviePlayer / AudioPlayer
    const PLAYER = document.getElementById('movie_player')! as IHTMLPlayer & HTMLElement;

    const SLIDER_INPUT = document.getElementById('volume-slider')! as HTMLInputElement;
    const VOLUME_INPUT = document.createElement('input');
    VOLUME_INPUT.id = 'VOLUME_INPUT';
    VOLUME_INPUT.style.cssText = `
        background-color: var(--ytmusic-player-bar-background);
        color: #909090; /** to make it look like it's from YTM */
        height: 40px;
        width: 40px
    `;
    VOLUME_INPUT.type = 'number';
    VOLUME_INPUT.value = SLIDER_INPUT.value;

    const inputUpdateVolume = (num: number) => {
        if(typeof num !== 'number') {
            throw new Error('Cannot set the volume `' + num + '` due to it not being a number.');
        }

        if(num > Number(SLIDER_INPUT.ariaValueMax)) {
            throw new Error('Cannot set the volume to `' + num + '` because it exceeds the bounds that the audio player can play.');
        }

        PLAYER.setVolume(num);
        SLIDER_INPUT.value = num.toString();
        SLIDER_INPUT.ariaValueNow = num.toString();
    };


    // This is a really bad solution, but it works.
    // Intercept all calls to `setAttribute`, if it's a call which updates `value` (what the slider elm updates)
    // then update it for our element as well. this is actually really fucked, and will cause issues in the feature
    // TODO: find a better way
    const SLIDER_SET_ATTRIBUTE = SLIDER_INPUT.setAttribute;

    SLIDER_INPUT.setAttribute = function (key: string, value: string) {
        if(key.toLowerCase() === 'value') {
            VOLUME_INPUT.value = value;
        }

        return SLIDER_SET_ATTRIBUTE.call(SLIDER_INPUT, key, value);
    };

    // change events, whenever VOLUME_INPUT updates. Should work for both new and old browsers
    VOLUME_INPUT.addEventListener('input', (e) => inputUpdateVolume(Number((e as unknown as InputEvent).data)));
    VOLUME_INPUT.addEventListener('change', () => inputUpdateVolume(Number(VOLUME_INPUT.value)));

    // repeat button element
    document.querySelector('#right-controls > div > tp-yt-paper-icon-button.repeat.style-scope.ytmusic-player-bar')
        ?.insertAdjacentElement('beforebegin', VOLUME_INPUT);
})();