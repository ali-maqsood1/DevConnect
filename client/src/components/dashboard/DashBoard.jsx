import PropTypes from 'prop-types'
import { useEffect } from 'react'
import { connect } from 'react-redux'
import { getCurrentProfile, deleteAccount } from '../../actions/profile.js'
import Spinner from "../layout/Spinner.jsx"
import DashboardActions from './DashBoardActions.js'
import Exeprience from './Exeprience.jsx'
import { Link } from 'react-router-dom'
import Education from './Education.jsx'

const DashBoard = ({ getCurrentProfile, deleteAccount, auth: {user}, profile: {profile, loading}}) => {

    useEffect(() => {
        getCurrentProfile();
    }, [getCurrentProfile])
  return (
    loading && profile === null ? <Spinner /> : 
    <>
        <h1 className="large text-primary">Dashboard</h1>
        <p className="lead">
            <i className="fas fa-user"> Welcome {user && user.name}</i>
        </p>
        {profile !== null ? 
        <>
            <DashboardActions />
            <Exeprience experience={profile.experience}/>
            <Education education={profile.education}/>
            <div className="my-2">
                <button className="btn btn-danger" onClick={() => deleteAccount()}>
                <i className="fas fa-user-minus" /> Delete My Account
                </button>
            </div>
        </> : 
        <>
            <p>You have not yet setup a profile, Please add some info</p>
            <Link to={'/create-profile'} className="btn btn-primary my-1"> Create Profile </Link>
        </>}
    </>
  )
}

DashBoard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    deleteAccount: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
})

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(DashBoard)
