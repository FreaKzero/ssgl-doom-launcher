export const initState = {
  name: '',
  iwad: '',
  sourceport: '',
  cover: '',
  id: null,
  copy: null
};

export const createPackage = (form, state) => {
  const iwad = state.iwads.find(i => i.path === form.iwad);

  const cover =
    form.cover && form.cover.trim() !== ''
      ? {
          isFile: true,
          use:
            form.cover.substring(0, 7) === 'file://'
              ? form.cover
              : `file://${form.cover}`
        }
      : { isFile: false, use: iwad.name.toLowerCase() };

  const newPackage = {
    id: form.id,
    copy: form.copy,
    name: form.name,
    iwad: form.iwad,
    sourceport: form.sourceport,
    selected: state.package.selected,
    created: Date.now(),
    lastplayed: 0,
    cover
  };

  return newPackage;
};
