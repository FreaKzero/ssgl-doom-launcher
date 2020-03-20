import shortid from 'shortid';

export const initState = {
  name: '',
  iwad: {},
  sourceport: '',
  cover: '',
  id: null
};

export const createPackages = (form, state) => {
  const useSourceport = state.sourceports.find(i => i.id === form.sourceport);
  const useIwad = state.iwads.find(i => i.path === form.iwad);

  const cover =
    form.cover && form.cover.trim() !== ''
      ? {
          isFile: true,
          use:
            form.cover.substring(0, 7) === 'file://'
              ? form.cover
              : `file://${form.cover}`
        }
      : { isFile: false, use: useIwad.name.toLowerCase() };

  const newPackage = {
    id: form.id ? form.id : shortid.generate(),
    name: form.name,
    iwad: useIwad,
    sourceport: useSourceport,
    selected: state.package.selected,
    cover: cover,
    created: Date.now(),
    lastplayed: 0
  };

  const newPackages =
    form.id === null
      ? [newPackage, ...state.packages]
      : state.packages.map(item => (item.id === form.id ? newPackage : item));

  return { packages: newPackages, pack: newPackage };
};
