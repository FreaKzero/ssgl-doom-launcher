export default {
  atoms: {
    reset: 'Reset',
    selectFile: 'Datei',
    selectDir: 'Ordner'
  },
  filters: {
    lastplayed: 'Zuletzt gespielt',
    oldest: 'Älteste',
    newest: 'Neueste',
    active: 'Gewählt'
  },
  wads: {
    filter: 'Suche unter {{size}} Mods',
    toastIndex: 'Mod Verzeichnis neu geladen',
    packEdit: 'Editieren',
    packSaveAs: 'Speichern als',
    packSave: 'Speichern',
    packReset: 'Reset'
  },
  sourceports: {
    paramSave: 'Speicher Verzeichnis Parameter',
    paramLoad: 'Spielstand Lade Parameter',
    parameter: 'Parameter',
    filename: 'Dateiname',
    delete: 'Sourceport Löschen',
    save: 'Sourceport Speichern',
    binary: 'Programmdatei',
    name: 'Name',
    savegameparam: 'Seperate Speicherdateien nach Paket',
    configDefault: 'Standard Konfiguration',
    configparam: 'Seperate Konfiguration nach Paket',
    toastSaved: 'Sourceport erfolgreich gespeichert',
    toastDeleted: 'Sourceport gelöscht'
  },
  settings: {
    titleDirectories: 'Verzeichnisse',
    titleCustomization: 'Anpassung',
    titleOblige: 'Oblige Integration',
    colorTheme: 'Farbthema',
    favouriteSourceport: 'Standard Programm',
    obligeConfigPath: 'Oblige Konfigurationsverzeichnis',
    obligeBinary: 'Oblige Programmdatei',
    obligeActive: 'Oblige aktivieren',
    savepath: 'SSGL Daten Verzeichnis',
    waddir: 'Wad Verzeichnis',
    wallpaper: 'Hintergrundbild',
    save: 'Einstellungen Speichern',
    toastSaved: 'Einstellungen erfolgreich gespeichert',
    startView: 'Startseite wenn SSGL geöffnet wird'
  },
  common: {
    deleteTitle: 'Löschen Bestätigen',
    deleteText: 'Diesen Eintrag wirklich Löschen ?',
    loading: 'Laden',
    language: 'Sprache',
    success: 'Aktion erfolgreich',
    error: 'Fehler',
    cancel: 'Abbrechen',
    ok: 'Ok',
    required: 'Erforderlich',
    toastRequired: 'Bitte Erforderliche Felder ausfüllen',
    toastStart: 'Starte Sourceport',
    toastStartText: `Starte {{sourceport}} mit {{num}} Mods`
  },
  nav: {
    appname: 'Super Shotgun Launcher',
    wads: 'Mods',
    packages: 'Pakete',
    sourceports: 'Programme',
    settings: 'Einstellungen'
  },
  packages: {
    lastplayed: 'Zuletzt: {{value, date}}',
    never: 'Zuletzt: Nie',
    filter: 'Suche unter {{size}} Pakete',
    titleSave: 'Speichern als: {{name}}',
    titleEdit: 'Bearbeiten: {{name}}',
    toastSave: 'Paket gespeichert',
    use: 'Wählen',
    play: 'Spielen',
    delete: 'Löschen',
    selectPackage: 'Paket wählen',
    datadir: 'Daten'
  },
  errors: {
    SETTINGS_FILE: 'No Settings found',
    UNEXPECTED: 'Unexpected Error happened',
    WALKER_ERROR: 'FileWalker Error',
    JSON_WRITE: 'Error while writing JSON File'
  }
};
