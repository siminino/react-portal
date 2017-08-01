import React from 'react';
import ReactDOM, { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';

const KEYCODES = {
  ESCAPE: 27,
};

export default class Portal extends React.Component {
  constructor(props) {
    super(props);

    this.closePortal = ::this.closePortal;
    this.handleOutsideMouseClick = ::this.handleOutsideMouseClick;
    this.handleKeydown = ::this.handleKeydown;

    this.portal = null;
    this.node = null;
  }

  componentDidMount() {
    if (this.props.closeOnEsc) {
      document.addEventListener('keydown', this.handleKeydown);
    }

    if (this.props.closeOnOutsideClick) {
      document.addEventListener('mouseup', this.handleOutsideMouseClick);
      document.addEventListener('touchstart', this.handleOutsideMouseClick);
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.isOpen) {
      this.renderPortal();
    } else if (prevProps.isOpen) {
      this.closePortal();
    }
  }

  componentWillUnmount() {
    if (this.props.closeOnEsc) {
      document.removeEventListener('keydown', this.handleKeydown);
    }

    if (this.props.closeOnOutsideClick) {
      document.removeEventListener('mouseup', this.handleOutsideMouseClick);
      document.removeEventListener('touchstart', this.handleOutsideMouseClick);
    }

    this.closePortal(true);
  }

  handleOutsideMouseClick(e) {
    if (!this.props.isOpen) {
      return;
    }

    const root = findDOMNode(this.portal);
    if (root.contains(e.target) || (e.button && e.button !== 0)) {
      return;
    }
    e.stopPropagation();
    this.props.onClose();
  }

  handleKeydown(e) {
    if (e.keyCode === KEYCODES.ESCAPE && this.props.isOpen) {
      this.props.onClose();
    }
  }

  closePortal() {
    if (this.node) {
      ReactDOM.unmountComponentAtNode(this.node);
      document.body.removeChild(this.node);
    }
    this.portal = null;
    this.node = null;
  }

  renderPortal() {
    if (!this.node) {
      this.node = document.createElement('div');
      document.body.appendChild(this.node);
    }

    let children = this.props.children;

    if (typeof children.type === 'function') {
      children = React.cloneElement(children, {
        closePortal: this.closePortal,
      });
    }

    this.portal = ReactDOM.unstable_renderSubtreeIntoContainer(
      this,
      children,
      this.node,
      this.props.onUpdate
    );
  }

  render() {
    return null;
  }
}

Portal.propTypes = {
  children: PropTypes.element.isRequired,
  closeOnEsc: PropTypes.bool,
  closeOnOutsideClick: PropTypes.bool,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  onUpdate: PropTypes.func,
};

Portal.defaultProps = {
  onOpen: () => {},
  onClose: () => {},
  onUpdate: () => {},
};
