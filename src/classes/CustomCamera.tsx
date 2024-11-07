import CameraControls from 'camera-controls';

// Make sure these methods are correctly exposed as public methods.
class CustomCameraControls extends CameraControls {

    public get domElement() {
        return this._domElement;
    }
    public enableAllEventListeners(element: HTMLElement) {
        this._addAllEventListeners(element);  // Access the protected method in the base class.
    }

    public disableAllEventListeners() {
        this._removeAllEventListeners();  // Access the protected method in the base class.
    }
}

export default CustomCameraControls;
