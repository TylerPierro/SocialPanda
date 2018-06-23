import { connect } from 'react-redux';
import { IState } from '../../reducers';
import { NewGroupComponent } from './newGroup.component';
import {  addNewGroup } from '../../actions/newGroup/newGroup.actions';

const mapStateToProps = (state: IState) => (state.newGroup);

export const mapDispatchToProps = {
  addNewGroup,
};

export const NewGroupContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(NewGroupComponent);
