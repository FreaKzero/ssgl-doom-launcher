export default {
  atoms: {
    reset: 'Reset',
    selectFile: 'File',
    selectDir: 'Directory'
  },
  filters: {
    lastplayed: 'Last played',
    oldest: 'Oldest first',
    newest: 'Newest first',
    active: 'Active first'
  },
  oblige: {
    buildMessage: 'Please wait, Oblige is Building',
    selectConfig: 'Select Build Config',
    modalTitle: 'Oblige Build and Play',
    open: 'Open Oblige',
    openDir: 'Config Directory',
    last: 'Play last',
    build: 'Build'
  },
  wads: {
    filter: 'Search in {{size}} Mods',
    toastIndex: 'Reindexed Mod Directory',
    packEdit: 'Edit',
    packSaveAs: 'Save as',
    packSave: 'Save',
    packReset: 'Reset'
  },
  sourceports: {
    paramSave: 'Save Directory Parameter',
    paramLoad: 'Load Savegame Parameter',
    parameter: 'Parameter',
    filename: 'File Name',
    delete: 'Delete Sourceport',
    save: 'Save Sourceport',
    binary: 'Sourceport Path',
    name: 'Sourceport Name',
    savegameparam: 'Seperate Savegames by Package',
    configDefault: 'Default Config File',
    configparam: 'Seperate Config by Package',
    toastSaved: 'Successfully saved Sourceport',
    toastDeleted: 'Deleted Sourceport'
  },
  settings: {
    titleDirectories: 'Directories',
    titleCustomization: 'Customization',
    titleOblige: 'Oblige Integration',
    colorTheme: 'Color Theme',
    favouriteSourceport: 'Favourite Sourceport',
    obligeConfigPath: 'Oblige Build Configs',
    obligeBinary: 'Oblige Binary',
    obligeActive: 'Activate Oblige',
    savepath: 'SSGL Data Directory',
    waddir: 'WAD Directory',
    wallpaper: 'Wallpaper Image',
    save: 'Save Settings',
    toastSaved: 'Successfully saved Settings',
    startView: 'Open View when SSGL starts'
  },
  common: {
    iwad: 'iWad',
    sourceport: 'Sourceport',
    close: 'Close',
    deleteTitle: 'Confirm Deletion',
    deleteText: 'Do you really want to delete this Item ?',
    loading: 'Loading',
    language: 'Language',
    success: 'Success',
    error: 'Error',
    cancel: 'Cancel',
    ok: 'Ok',
    required: 'Required',
    toastRequired: 'Please Fill out the required Fields',
    toastStart: 'Starting Sourceport',
    toastStartText: `Starting {{sourceport}} with {{num}} Mods`
  },
  nav: {
    appname: 'Super Shotgun Launcher',
    wads: 'Mods',
    packages: 'Packages',
    sourceports: 'Sourceports',
    settings: 'Settings'
  },
  packages: {
    cover: 'Cover',
    packageName: 'Package Name',
    userParams: 'Start Parameters',
    lastplayed: 'Last played: {{value, date}}',
    never: 'Last played: Never',
    filter: 'Search in {{size}} Packages',
    titleSave: 'Save as: {{name}}',
    titleEdit: 'Edit: {{name}}',
    toastSave: 'Saved Package',
    use: 'Use',
    play: 'Play now',
    delete: 'Delete',
    selectPackage: 'Select Package',
    datadir: 'Data'
  },
  errors: {
    SETTINGS_FILE: 'No Settings found',
    UNEXPECTED: 'Unexpected Error happened',
    WALKER_ERROR: 'FileWalker Error',
    JSON_WRITE: 'Error while writing JSON File'
  }
};
