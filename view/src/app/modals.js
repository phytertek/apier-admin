import React from 'react';
import AddComponentModal from '../common/component/addComponentModal';
import AddRouteModal from '../common/route/addRouteModal';
import AddSchemaModal from '../common/schema/addSchemaModal';

const Modals = () => {
  return (
    <div>
      <AddRouteModal />
      <AddComponentModal />
      <AddSchemaModal />
    </div>
  );
};

export default Modals;
