import Data.Maybe
import Data.Char
import Data.List


firstUppercasedOverLengthFive:: [String] -> Maybe String
firstUppercasedOverLengthFive ss  =
    case find (\s -> length s > 5) ss of
        Nothing -> Nothing
        Just s -> Just $ map toUpper s

main = print (firstUppercasedOverLengthFive ["hi", "sofiar"])
