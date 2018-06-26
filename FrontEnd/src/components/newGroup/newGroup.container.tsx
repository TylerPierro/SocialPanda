import { connect } from 'react-redux';
import { IState } from '../../reducers';
import { NewGroupComponent } from './newGroup.component';
import { updateCity, updateDisplay1, updateDisplay2, updateTag } from '../../actions/groups/groups.actions';

const mapStateToProps = (state: IState) => (state.groups);

export const mapDispatchToProps = {
  updateCity,
  updateDisplay1,
  updateDisplay2,
  updateTag
};

export const GroupsContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(NewGroupComponent);
