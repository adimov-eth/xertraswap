import React from "react";
import styled from "styled-components";
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
  text-decoration: none;
  :hover {
    opacity: 0.8;
  }
`;

// STRAX price display - links to Stratis info
const StraxPrice: React.FC<Props> = ({ straxPriceUsd, cakePriceUsd }) => {
  const price = straxPriceUsd ?? cakePriceUsd;
  return price ? (
    <PriceLink href="https://www.coingecko.com/en/coins/stratis" target="_blank" rel="noopener noreferrer">
      <Text color="textSubtle" bold>{`$${price.toFixed(3)}`}</Text>
    </PriceLink>
  ) : (
    <Skeleton width={80} height={24} />
  );
};

// Backwards compatibility export
export const CakePrice = StraxPrice;

export default React.memo(StraxPrice);
