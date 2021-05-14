import { ClickAwayListener, Modal } from "@material-ui/core";
import TweetContent from "components/TweetContent/TweetContent";
import { TOOLTIP_WIDTH } from "components/NetworkGraph/NodeTooltip";
import useStore from "providers/store/store";
import { useSelectedNode } from "providers/store/useSelectors";
import React from "react";
import styled from "styled-components/macro";
import { Tweet } from "react-twitter-widgets";
import { CUSTOM_SCROLLBAR_CSS } from "components/common/styledComponents";

const SelectedTweetModal = () => {
  const selectedNode = useSelectedNode();
  console.log("🌟🚨 ~ SelectedTweetModal ~ selectedNode", selectedNode);
  const setSelectedNode = useStore((state) => state.setSelectedNode);
  return (
    <Modal open={Boolean(selectedNode)}>
      <SelectedTweetModalStyles>
        <ClickAwayListener onClickAway={() => setSelectedNode(null)}>
          <div className="tweetContentWrapper">
            {selectedNode && <TweetContent tweet={selectedNode} />}
            {selectedNode && (
              <Tweet
                tweetId={selectedNode.id_str}
                options={{ dnt: true, theme: "dark" }}
              />
            )}
          </div>
        </ClickAwayListener>
      </SelectedTweetModalStyles>
    </Modal>
  );
};

const SelectedTweetModalStyles = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
  .tweetContentWrapper {
    border-radius: 8px;
    box-sizing: border-box;
    padding: 1.5em;
    background: hsla(0, 0%, 0%, 0.8);
    max-width: ${TOOLTIP_WIDTH}px;
    max-height: calc(100vh - 48px);
    ${CUSTOM_SCROLLBAR_CSS}
  }
`;

export default SelectedTweetModal;
