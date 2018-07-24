/* @TODO:

 TODOS:
  * Rename to View (see: https://unbug.gitbooks.io/react-native-training/content/45_naming_convention.html)
  * Put counters as properties on creatures(label:value pairs)
  * EVENTUALLY: Figure out saving settings for counters
  */


// Libs
import _ from 'lodash';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
// import PropTypes from 'prop-types';
import React from 'react';

// Child Components
import Counter from './Counter';
import Button from './Button';
import InitiativeToken from './InitiativeToken';
import SortableList from './SortableList';

// Actions
import * as creatureActions from '../actions/creatures';
import * as timerActions from '../actions/timers';

class Initiative extends React.Component {
  constructor(props) {
    super(props);
    this.state = {turn: 1};
  };

  handleCreatureCreate = (name) => {
    this.props.actions.creature.createCreature({name});
  };

  handleSortEnd = ({oldIndex, newIndex}) => this.props.reorderCreatures(oldIndex, newIndex);

  advanceInitiative = () => {
    this.props.reorderCreatures(0, -1);
    this.setState({turn: this.state.turn + 1})
    if (this.state.turn % this.props.creatureIds.length == 0){
      this.props._timer.addSeconds(6)
    }
  }

  render() {
    const { creatures, creatureIds } = this.props;
    return (
      <div className="initiative">
        <SortableList
          items={creatureIds.map(creatureId => creatures[creatureId], [])}
          onSortEnd={this.handleSortEnd}
        />
        <Button
          buttonLabel="New Creature"
          onSubmit={this.handleCreatureCreate}
        />
        <Button
          buttonLabel="Advance Initiative"
          onSubmit={this.advanceInitiative}
        />
      </div>
    );
  };
};

const mapStateToProps = state => ({
  creatureIds: state.creatures.allIds,
  creatures: state.creatures.byId
});

const mapDispatchToProps = {
  createCreature: creatureActions.createCreature,
  updateCreature: creatureActions.updateCreature,
  deleteCreature: creatureActions.deleteCreature,
  reorderCreatures: creatureActions.reorderCreatures,
};

export default connect(mapStateToProps, mapDispatchToProps)(Initiative);