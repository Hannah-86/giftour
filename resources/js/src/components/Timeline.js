import React from "react";
import _ from "lodash";
import { connect } from "react-redux";

import Search from "./Search";
import Gift from "./Gift";
import Footer from "./Footer";
import { readGifts } from "../actions/gifts";
import { readBookmarks } from "../actions/bookmarks";

class Timeline extends React.Component {
  componentDidMount() {
    const { userId, accessToken } = this.props

    this.props.readGifts();
    this.props.readBookmarks(userId, accessToken);
  }

  render() {
    const { userId, accessToken, readGifts, readBookmarks } = this.props

    return (
      <div className="timeline">
        <Search userId={userId} accessToken={accessToken} readGifts={readGifts} readBookmarks={readBookmarks} />
        <div className="gifts">
          {_.map(this.props.gifts, gift => (
            <Gift gift={gift} bookmarks={this.props.bookmarks} key={gift.id} />
          ))}
        </div>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  accessToken: state.auth.access_token,
  userId: state.user.id,
  gifts: state.gifts,
  bookmarks: state.bookmarks
});
const mapDispatchToProps = { readGifts, readBookmarks };
export default connect(mapStateToProps, mapDispatchToProps)(Timeline);
