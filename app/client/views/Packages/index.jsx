import { AnimatePresence } from 'framer-motion';
import React, { useContext, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

import { Box } from '../../components';
import { StoreContext } from '../../state';
import { sortList } from '../../utils';
import Pack from './Pack';
import PackageFilter from './PackageFilter';

const Packages = () => {
  const { gstate } = useContext(StoreContext);
  const [filter, setRawFilter] = useState('');
  const [sort, setSort] = useState('last');

  const onSort = ({ value }) => setSort(value);

  const [onInput] = useDebouncedCallback(val => {
    setRawFilter(val.toLowerCase());
  }, 300);

  let show = sortList(gstate.packages, sort, filter);

  return (
    <Box
      fixed={
        <PackageFilter
          sortValue={sort}
          onSort={onSort}
          size={show.length}
          onInput={(e, { value }) => onInput(value)}
        />
      }
    >
      <AnimatePresence>
        {show.map(pack => (
          <Pack pack={pack} key={pack.id} />
        ))}
      </AnimatePresence>
    </Box>
  );
};
export default Packages;
