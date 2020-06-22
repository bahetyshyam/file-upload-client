import * as React from "react";

var MyIframe = React.createClass({
  render: function () {
    return (
      <div style={{ display: "none" }}>
        <iframe src={this.props.iframeSrc} />
      </div>
    );
  },
});

export default MyIframe;
