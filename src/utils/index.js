export const getDivPositions = (id) => {
    console.log('id is', id)
    // Get the reference to your div element
    const divElement = document.getElementById(`${id}`);
    console.log('divElement', divElement);
    // Get the bounding rectangle of the div
    const rect = divElement.getBoundingClientRect();

    // Extract coordinates from the rectangle
    const x = rect.left + window.scrollX;
    const y = rect.top + window.scrollY;

    // Log the coordinates
    console.log(`Top-left corner: (${x}, ${y})`);

    // Calculate other corners if needed
    const right = rect.right + window.scrollX;
    const bottom = rect.bottom + window.scrollY;
    const width = rect.width;
    const height = rect.height;

    console.log(`Bottom-right corner: (${right}, ${bottom})`);
    console.log(`Width: ${width}`);
    console.log(`Height: ${height}`);
    return {x, y, right, bottom, width, height};
}