import { connect } from 'react-redux';
import { IState } from '../../reducers';
import { HomeComponent } from './home.component';
import { createPost } from '../../actions/home/home.actions';

const mapStateToProps = (state: IState) => (state.home);

export const mapDispatchToProps = {
    createPost,
};

export const HomeContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(HomeComponent);