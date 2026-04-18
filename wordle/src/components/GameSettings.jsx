function Gamesettings({ settings, onChange }) {

    function handleLengthChange(e) {
        onChange({...settings,wordLength: Number(e.target.value),});
    }

    function handleDuplicatesChange(e) {
        onChange({...settings,allowDuplicates: e.target.checked, });
    }

    return (
        <div style={{ marginBottom: 16, color: 'white', fontSize: 18 }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8 }}>
                Choose word length:
                <select value={settings.wordLength} onChange={handleLengthChange}>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                    <option value={6}>6</option>
                </select>
            </label>

            <label style={{ display: 'flex', alignItems: 'center', gap: 8,marginTop: 8 }}>
                Check to allow duplicate letters in the word:
                <input
                    type="checkbox"
                    style = {{width: 20, height: 20, color: 'white'}}
                    checked={settings.allowDuplicates}
                    onChange={handleDuplicatesChange}
                />
            </label>
        </div>
    );
}

export default Gamesettings;