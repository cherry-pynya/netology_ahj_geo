export default function postFactory(obj) {
  return `
      <div class="post-container">
        <div class="post-time">
          <span>${obj.date}</span>
        </div>
        <div class="post-content">
          <span>${obj.content}</span>
        </div>
        <div class="post-cordinate">
          <span>${obj.coords}</span>
        </div>
      </div>
    `;
}
