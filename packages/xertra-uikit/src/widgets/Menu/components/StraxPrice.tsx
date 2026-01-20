import React from "react";
import styled from "styled-components";
import { XertraRoundIcon } from "../../../components/Svg";
import Text from "../../../components/Text/Text";
import Skeleton from "../../../components/Skeleton/Skeleton";

interface Props {
  straxPriceUsd?: number;
  // Backwards compatibility
  cakePriceUsd?: number;
}

const PriceLink = styled.a`
  display: flex;
  align-items: center;
  svg {
    transition: transform 0.3s;
  }
  :hover {
    svg {
      transform: scale(1.2);
    }
  }
`;

// STRAX price display - links to Stratis info
const StraxPrice: React.FC<Props> = ({ straxPriceUsd, cakePriceUsd }) => {
  const price = straxPriceUsd ?? cakePriceUsd;
  return price ? (
    <PriceLink href="https://www.coingecko.com/en/coins/stratis" target="_blank">
      <XertraRoundIcon width="24px" mr="8px" />
      <Text color="textSubtle" bold>{`$${price.toFixed(3)}`}</Text>
    </PriceLink>
  ) : (
    <Skeleton width={80} height={24} />
  );
};

// Backwards compatibility export
export const CakePrice = StraxPrice;

export default React.memo(StraxPrice);
