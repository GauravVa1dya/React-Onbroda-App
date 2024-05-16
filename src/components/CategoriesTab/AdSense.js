import React, { useEffect } from "react";

const AdSense = () => {
  useEffect(() => {
    // Load Google AdSense script
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={{ display: "block" }}
      data-ad-format="autorelaxed"
      data-ad-client="ca-pub-7811854995608470"
      data-ad-slot="1288342921"
    />
  );
};

export default AdSense;


// <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7811854995608470"
//      crossorigin="anonymous"></script>
// <!-- Onborda-1 -->
// <ins class="adsbygoogle"
//      style="display:block"
//      data-ad-client="ca-pub-7811854995608470"
//      data-ad-slot="6368159650"
//      data-ad-format="auto"
//      data-full-width-responsive="true"></ins>
// <script>
//      (adsbygoogle = window.adsbygoogle || []).push({});
// </script>