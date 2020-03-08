import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { StoreContext } from '#State';
import { Box } from '#Component';
import fuzz from 'fuzzysearch';
import Pack from './Pack';
import { AnimatePresence } from 'framer-motion';
import { useDebouncedCallback } from 'use-debounce';
import PackageFilter from './PackageFilter';

const Packages = () => {
  const { gstate, dispatch } = useContext(StoreContext);
  const [filter, setRawFilter] = useState('');
  const [sort, setSort] = useState('last');

  const buildShowList = () => {
    const srt = () => {
      switch (sort) {
        case 'asc':
          return gstate.packages.sort((a, b) => {
            if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
            if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
            return 0;
          });
        case 'desc':
          return gstate.packages.sort((a, b) => {
            if (a.name.toLowerCase() > b.name.toLowerCase()) return -1;
            if (a.name.toLowerCase() < b.name.toLowerCase()) return 1;
            return 0;
          });
        case 'new':
          return gstate.packages.sort((a, b) => b.created - a.created);
        case 'old':
          return gstate.packages.sort((a, b) => a.created - b.created);
        case 'last':
          return gstate.packages.sort((a, b) => b.lastplayed - a.lastplayed);
        default:
          return gstate.packages;
      }
    };

    if (gstate.packages.length) {
      let show = srt();
      return filter.trim() !== ''
        ? show
            .filter(i => fuzz(filter.toLowerCase(), i.name.toLowerCase()))
            .sort((a, b) => {
              if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
              if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
              return 0;
            })
        : show;
    }

    return [];
  };

  let show = buildShowList();

  const onSort = ({ value }) => setSort(value);

  const [onInput] = useDebouncedCallback(val => {
    setRawFilter(val.toLowerCase());
  }, 300);

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
