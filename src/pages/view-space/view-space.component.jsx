import React, {useEffect, useState} from "react";
import {connect} from 'react-redux';
import Viewer from 'react-viewer';
import './view-space.styles.scss';
import {selectProperty} from "../../redux/properties/properties.selectors";
import {selectCurrentUser, selectLoadingUser} from "../../redux/user/user.selectors";

const ViewSpace = ({property, currentUser, isUserLoading}) => {

    const [visible, setVisible] = useState(false);
    const defaultProfile = 'https://firebasestorage.googleapis.com/v0/b/efiewura-db-60044.appspot.com/o/site-images%2Favatar-placeholder_v0ecjm.png?alt=media&token=ec952423-c148-409e-ab6e-15bf295424bd';
    const profile_img = isUserLoading ? defaultProfile : currentUser.profile_img;

    return (
        <>
            <section className="container" id="view-listing-head">
                <div className="main-pic animated fadeIn delay-1s">
                    <img className="img-raised rounded img-fluid" src={property.main_image_url}
                         alt=""/>
                </div>
                <div className="animated fadeIn" id="listing-details">
                    <h2 style={{textTransform: 'capitalize'}}>{property.property_type} in {property.town}</h2>
                    <p style={{fontSize: '1.1em'}}><span style={{fontWeight: '400'}}>Region :</span> {property.region}
                    </p>
                    <p style={{fontSize: '1.1em'}}><span
                        style={{fontWeight: '400'}}>District :</span> {property.district}</p>
                    <p style={{fontSize: '1.1em'}}><span
                        style={{fontWeight: '400'}}>Price :</span> Ghc {property.price} &#9679;
                        {property.negotiation_status}</p>
                    <h3>Description</h3>
                    <p style={{fontSize: '1.1em'}}>
                        {
                            property.description ? property.description : `Lorem ipsum dolor sit amet, consectetur adipisicing elit. At
                            consequuntur, ducimus
                            laboriosam modi mollitia
                            nulla ratione similique sunt tempora ullam. Amet aspernatur atque debitis non praesentium
                            quaerat quis
                            similique veniam.`
                        }
                    </p>
                </div>
            </section>

            <div style={{marginTop: '50px'}} className="container">
                <h3>Click on any of the images to open the image gallery</h3>
            </div>


            <section className="container animated fadeIn delay-1s" id="other-pics">
                {
                    property.other_images_url.map((image_url) => {
                        return (
                            <div onClick={() => {
                                setVisible(true);
                            }} key={image_url.id + 300} className="other-pic-item">
                                <img className="img-raised rounded img-fluid" src={image_url.url}
                                     alt={`Property at ${property.town}`}/>
                            </div>
                        );
                    })
                }
            </section>

            <div>
                <Viewer
                    visible={visible}
                    onClose={() => {
                        setVisible(false);
                    }}
                    images={
                        property.other_images_url.map((image_url) => {
                            return {
                                src: image_url.url,
                                alt: `${property.property_type} at ${property.town}`
                            };
                        })
                    }
                />
            </div>

            <div style={{paddingTop: '150px', paddingBottom: '100px'}} className="container">
                <h2 style={{textTransform: 'capitalize', textAlign: 'center', marginBottom: '40px'}}>Contact the host to
                    book your
                    room</h2>
                <div className="row">
                    <div className="col-xs-12 offset-xs-0 col-md-6 offset-md-3">
                        <h2 style={{fontWeight: 'bold'}}>Summary Of Uploaded Ad</h2>
                        <h2>Owner's Details</h2>
                        <div className="profile">
                            <div className="profile-top">
                                <div className="profile-img">
                                    <img className="img-fluid"
                                         src={profile_img ? profile_img : defaultProfile}
                                         alt={`${property.username}'s profile`}/>
                                </div>
                                <div className="profile-username">
                                    <p>{property.username}</p>
                                </div>
                            </div>
                            <div className="profile-bottom">
                                <div className="profile-content">
                                    <div className="single-item">
                                        <div className="item-left">City Of Residence</div>
                                        <div className="item-right">{property.address}</div>
                                    </div>
                                    <hr/>
                                    <div className="single-item">
                                        <div className="item-left">Email</div>
                                        <div className="item-right">{property.email}</div>
                                    </div>
                                    <hr/>
                                    <div className="single-item">
                                        <div className="item-left">Contact</div>
                                        <div className="item-right">{property.contact}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

const mapStateToProps = (state, ownProps) => ({
    property: selectProperty(ownProps.match.params.uid)(state),
    currentUser: selectCurrentUser(state),
    isUserLoading: selectLoadingUser(state)
});

export default connect(mapStateToProps)(ViewSpace);
