import React from 'react';
import {T} from '#Util/translation';
const Test = () => {
    return <div><T>save</T></div>
}

const Test2 = () => {
    return <div>Test2!</div>
}

const routes = [
    {
        label: 'test1',
        href: '/test',
        component: Test
    },
    {
        label: 'test2',
        href: '/test2',
        component: Test2
    }

];

export default routes;