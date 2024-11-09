
# **Promingy Portfolio Documentation**

## **Project Overview**

This portfolio is an interactive, 3D-driven website built using **ThreeJS**. It showcases a variety **full-stack development** of skills and advanced **web animations**. The portfolio features interactive components, animations, and optimizations that create an engaging user experience. The primary focus is on leveraging **3D web technologies** to deliver a unique and visually compelling user experience.

## **Technologies Used**

- **TypeScript**: Ensures type safety and provides better tooling for React development.
- **ThreeJS**: Used for creating interactive 3D visuals and animations.
- **React**: Frontend framework for building the user interface.
- **React Three Fiber**: A React renderer for building 3D scenes with Three.js.
- **Drei**: A collection of helpful components for React Three Fiber.
- **Vite**: A fast build tool and development server for React.
- **CSS**: For styling and creating responsive layouts, including custom animations.

## **Features**

- **Arcade Machine Components**: Interactive 3D models used to showcase other projects, with the arcade screens embedding live project sites for full interactivity within the portfolio.
- **Cloud Opacity Animation**: Conditional rendering of clouds based on opacity, enhancing the visual experience.
- **Responsive Design**: Ensures that the portfolio is accessible and optimized for both desktop and mobile devices.
- **Performance Optimizations**:
  - **useCallback** and **debounce** hooks to improve performance by memoizing functions and reducing unnecessary re-renders.
  - Smooth transitions and animations to create an engaging experience without sacrificing speed.
- **Data Management**: All project data is organized in a standalone JSON file, making it easy for others to access and modify the data for customization or future development.

## **Optimizations**
- **Pre-Loading Models**: Optimized the loading sequence to reduce wait times for 3D Assets.
- **Draco Model Compression**: Reduced model file sizes by 90% using Draco Compression.
- **Dynamic Texture Resolution**:  Adjusted texture quality based on the camera's distance from objects to improve performance without sacrificing visual quality.
- **Model Face Reduction**: Reduced polygon counts by 97%, from over 3 million per frame to under 100,000 for smoother rendering.
- **Baked Lighting**: Precomputed lighting and shadow maps to reduce real-time rendering overhead.
- **Texture Atlas**: Combined multiple textures into a single atlas to reduce draw calls and enhance performance.

## **Setup**

To run this project locally, follow the steps below:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Promingy/Promingy.GitHub.io.git portfolio
   ```

2. **Navigate to the project directory:**
   ```bash
   cd portfolio
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

The app will be available at [http://localhost:3000](http://localhost:3000) in your browser.

## **File Structure**

- **`src/`**: Contains all source code for the project.
  - **`components/`**: Contains JavaScript React components like `ArcadeMachine`, `Cloud`, and other UI elements.
  - **`tsx_components/`**: Contains TypeScript React components like `ArcadeMachine`, `Cloud`, and other UI elements. (project is currently using this one, update imports in App.jsx if you want to use the JSX components)
  - **`hooks/`**: Custom React hooks like `useOpacityAnimation` and `useCallback`.
  - **`assets/`**: Stores images, 3D models, sounds

## **License**

This project is licensed under the MIT License.
