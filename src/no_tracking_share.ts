(function no_tracking_share() {
    function handleClipboardUpdate() {
        navigator.clipboard.readText().then((s) => {
            if(s.startsWith('https://music.youtube.com/watch?v=')) {
                void navigator.clipboard.writeText(s.slice(0, s.indexOf('si') - 1));
            }
        }).catch(console.error);
    }

    navigator.clipboard.addEventListener('clipboardchange', handleClipboardUpdate);
})();