function Settings({ settings, onChange }) {

    function handleLengthChange(e) {
        onChange({
            ...settings,
            wordLength: Number(e.target.value), 
        });
    }

    function handleDuplicatesChange(e) {
        onChange({
            ...settings,
            allowDuplicates: e.target.checked, 
        });
    }

    return (
        <div style={{ marginBottom: 16, backgroundColor: 'red', color: 'white', fontSize: 14 }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                Choose word length:
                <select value={settings.wordLength} onChange={handleLengthChange}>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                    <option value={6}>6</option>
                </select>
            </label>

            <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                Check to allow duplicate letters in the word:
                <input
                    type="checkbox"
                    checked={settings.allowDuplicates}
                    onChange={handleDuplicatesChange}
                />
            </label>
        </div>
    );
}

export default Settings;