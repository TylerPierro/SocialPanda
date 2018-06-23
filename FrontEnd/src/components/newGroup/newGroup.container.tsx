import { connect } from 'react-redux';
import { IState } from '../../reducers';
import { NewGroupComponent } from './newGroup.component';
import {  updateDescription, updateLocation, updateStatus, updateTag } from '../../actions/newGroup/newGroup.actions';

const mapStateToProps = (state: IState) => (state.newGroup);

export const mapDispatchToProps = {
  updateDescription,
  updateLocation,
  updateStatus,
  updateTag
};

export const NewGroupContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(NewGroupComponent);
