import { connect } from 'react-redux';
import { IState } from '../../reducers';
import { DashboardComponent } from './userDashboard.component';
import { updateGroups, updateGroupsDisplay } from '../../actions/messages/messages.actions';

const mapStateToProps = (state: IState) => (state.dashboard);

export const mapDispatchToProps = {
  updateGroups,
  updateGroupsDisplay
};

export const DashboardContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(DashboardComponent);
